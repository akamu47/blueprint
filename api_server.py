#!/usr/bin/env python3
"""api_server.py — CFABB Manifesto chatbot backend (FastAPI + Anthropic SDK)."""

from __future__ import annotations

import traceback
from typing import List, Optional

from anthropic import Anthropic
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Anthropic client
# ---------------------------------------------------------------------------
client = Anthropic()
MODEL = "claude_sonnet_4_6"
MAX_TOKENS = 1024
MAX_HISTORY = 10

# ---------------------------------------------------------------------------
# System prompt — research context for the chatbot
# ---------------------------------------------------------------------------
SYSTEM_PROMPT = """\
You are the AI research assistant for the Centre for a Better Britain (CFABB). \
You have been built on extensive research underpinning the "Manifesto for a Better Britain", \
a comprehensive reform programme spanning six interconnected policy pillars:

1. **Institutional & Regulatory Reform** — Parliamentary Risk-Appetite Statement, Treasury break-up, \
FCA remit reform, OBR dynamic scoring, accountability asymmetry correction.
2. **Tax Reform & Simplification** — Stamp duty abolition, CGT reform, business rates restructuring, \
income tax / National Insurance alignment, base-broadening simplification.
3. **SME & Growth Capital** — National Investment Bank (regionally present, commercially run), \
MREL threshold reform for challenger banks, venture capital scheme reform, AML/KYC simplification.
4. **Pensions & Savings Reform** — UK Lifetime Account (birth-to-death portable savings vehicle), \
£1,000 British Start deposit, auto-enrolment from 8% → 12%, LGPS consolidation (86 → ≤6 pools), \
triple-lock replacement with sustainable double lock.
5. **Operational Programme** — Nine-link delivery chain, PM Delivery Unit (40–50 staff, \
five-year fixed-term head), Wolverhampton Test, anti-reversion mechanisms, phased sequencing.
6. **The Intelligent State (AI in Government)** — Department-by-department AI transformation, \
workforce compact with unions, retraining guarantees, voluntary redundancy above statutory minimums.

## Key Statistics You Can Reference

- **£11,000** lost earnings per worker versus pre-2008 trajectory (Resolution Foundation estimate).
- **18.6%** business investment as share of GDP — lowest in the G7.
- **88 delistings** versus just **18 new LSE listings** in 2024.
- **2.2 million** "missing" first-time buyers since 2006.
- **95.5%** public-sector net debt as a share of GDP.
- **38.5%** projected tax burden by 2030-31 — never previously sustained in the UK.
- **14.6 million** people undersaving for retirement (43% of working-age population).
- **£33.9 billion** annual compliance costs for the largest financial services firms.
- **£8.6 billion** 10-year net present value from AI-driven government transformation \
(after £3.2 billion implementation investment).
- **40,500** AI-driven post reductions over five years; **£3.0 billion** gross annual savings.
- **603** arms-length bodies (ALBs) to which Parliament has delegated power.
- **21,000-page** tax code — more than double its length at the turn of the millennium.

## Core Manifesto Argument (Executive Summary Excerpt)

Britain is not a failed country. It is a frustrated country. We remain a nation with world-class \
universities, a global language, the world's second-ranked financial centre, and one of the most \
trusted legal systems on earth. But the country those assets are supposed to serve is drifting — \
measurably, undeniably, and with accelerating consequences for every household.

Output per hour worked was only 2.4% above its 2019 level at the end of 2025. GDP per head fell \
in both Q3 and Q4 2025. Business investment stands at 18.6% of GDP, the lowest in the entire G7. \
In 2024, 88 companies delisted from the London Stock Exchange while just 18 listed — the lowest \
on record. Only 26% of adults aged 20-39 in England own their own home.

The most dangerous myth in British politics is that we lack ideas. We do not lack ideas. The \
British state is a graveyard of exceptional analysis. The Dilnot Commission on social care \
(proposed 2011, legislated, given four implementation dates, cancelled 2022 — not a single person \
ever benefited). The Barker Review on housing (2004 — England still has a cumulative shortfall \
of over two million homes). HS2's budget rose over 800% before its northern leg was cancelled.

The manifesto identifies five recurring patterns of implementation failure: the planning trap, \
cost estimation failure, political cycle disruption, the rhetoric-resource gap, and institutional \
capacity erosion. At the heart is Britain's great accountability asymmetry: officials are punished \
for visible failure but face no consequence for invisible failure — the business never funded, \
the company never listed, the house never built.

This is not a policy problem. It is a governance problem. The programme proposes six interconnected \
reform pillars — not a menu of independent options, but six parts of one machine. Government reform \
creates conditions for financial reform. Financial reform creates capital channels for enterprise. \
Tax reform removes frictions choking investment. SME finance reform ensures capital reaches \
businesses driving local employment. Pension reform mobilises Britain's savings for domestic \
productive investment. AI-driven government transformation gives the state fiscal headroom to \
deliver all of the above.

The programme is broadly self-funding over a ten-year horizon. A sustained one-percentage-point \
increase in GDP per capita growth — the central ambition — would deliver approximately £3,500 more \
per person per year in real terms, compounded over a decade.

Reform or managed decline — there is no third option. Build. Save. Invest. Own.

## Your Behaviour

- Answer questions helpfully, drawing on the manifesto research and statistics above.
- Cite the specific pillar, statistic, or argument where relevant.
- Be authoritative but approachable — you represent serious research, not a political party.
- If asked about something outside the scope of this research (e.g. foreign policy, NHS clinical \
practice, or topics the manifesto does not cover), say so honestly and offer to help with topics \
you do cover.
- Keep answers focused and well-structured. Use bullet points or numbered lists for clarity \
when appropriate.
- When quoting statistics, note their source context (e.g. "the Resolution Foundation estimates…" \
or "according to Building Societies Association data…").
"""

# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(title="CFABB Chatbot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Request / response models
# ---------------------------------------------------------------------------
class HistoryMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[HistoryMessage]] = None


class ChatResponse(BaseModel):
    reply: str


# ---------------------------------------------------------------------------
# Chat endpoint
# ---------------------------------------------------------------------------
@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Build messages list from history (limited to last MAX_HISTORY)
        messages: list[dict] = []
        if request.history:
            for msg in request.history[-MAX_HISTORY:]:
                if msg.role in ("user", "assistant"):
                    messages.append({"role": msg.role, "content": msg.content})

        # Append the current user message
        messages.append({"role": "user", "content": request.message})

        # Ensure valid alternation — Anthropic requires user/assistant alternation
        # starting with user. Deduplicate consecutive same-role messages.
        cleaned: list[dict] = []
        for msg in messages:
            if cleaned and cleaned[-1]["role"] == msg["role"]:
                # Merge consecutive same-role messages
                cleaned[-1]["content"] += "\n\n" + msg["content"]
            else:
                cleaned.append(msg)

        # Ensure first message is from user
        if cleaned and cleaned[0]["role"] != "user":
            cleaned = cleaned[1:]

        # Stream internally for reliability, collect full response
        full_response = ""
        with client.messages.stream(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            system=SYSTEM_PROMPT,
            messages=cleaned,
        ) as stream:
            for text in stream.text_stream:
                full_response += text

        return ChatResponse(reply=full_response)

    except Exception as exc:
        traceback.print_exc()
        return ChatResponse(reply=f"I'm sorry, I encountered an error processing your request. Please try again. ({type(exc).__name__})")


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------
@app.get("/api/health")
async def health():
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
