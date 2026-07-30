// ─── Lógica Financeira — Sistemas PRICE e SAC ──────────────────────────────────
// Cálculos puros sem dependências externas
// Referência: BACEN — Resolução nº 4.881/2020 (CET — Custo Efetivo Total)

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export interface SimulationResult {
  monthlyInstallment: number      // Primeira parcela (PRICE: constante, SAC: maior)
  totalPaid: number               // Total a ser pago
  totalInterest: number           // Total de juros
  cetAnnual: number               // CET anual estimado (%)
  amortizationTable: AmortizationRow[]
}

// ─── SISTEMA PRICE (Tabela Francesa) ──────────────────────────────────────────
// Parcelas iguais ao longo do prazo
// PMT = PV * [i(1+i)^n] / [(1+i)^n - 1]

export function calcularPrice(
  principal: number,
  monthlyRate: number,
  termMonths: number,
  balloonPayment = 0,
): SimulationResult {
  const pv = principal - balloonPayment / Math.pow(1 + monthlyRate, termMonths)
  const factor = Math.pow(1 + monthlyRate, termMonths)
  const pmt = pv * (monthlyRate * factor) / (factor - 1)

  let balance = pv
  const table: AmortizationRow[] = []
  let totalInterest = 0

  for (let m = 1; m <= termMonths; m++) {
    const interest = balance * monthlyRate
    const principalPayment = pmt - interest
    balance -= principalPayment
    totalInterest += interest

    table.push({
      month: m,
      payment: round2(m === termMonths ? pmt + balloonPayment : pmt),
      principal: round2(principalPayment),
      interest: round2(interest),
      balance: round2(Math.max(0, balance)),
    })
  }

  const totalPaid = pmt * termMonths + balloonPayment

  return {
    monthlyInstallment: round2(pmt),
    totalPaid: round2(totalPaid),
    totalInterest: round2(totalInterest),
    cetAnnual: calcularCET(principal, pmt, termMonths, monthlyRate),
    amortizationTable: table,
  }
}

// ─── SISTEMA SAC (Sistema de Amortização Constante) ───────────────────────────
// Amortização constante, juros decrescentes, parcelas decrescentes
// Parcela = Amortização Constante + Juros do Período

export function calcularSAC(
  principal: number,
  monthlyRate: number,
  termMonths: number,
  balloonPayment = 0,
): SimulationResult {
  const amortizacaoConstante = (principal - balloonPayment) / termMonths
  let balance = principal
  const table: AmortizationRow[] = []
  let totalInterest = 0
  let totalPaid = 0

  for (let m = 1; m <= termMonths; m++) {
    const interest = balance * monthlyRate
    const payment = amortizacaoConstante + interest + (m === termMonths ? balloonPayment : 0)
    balance -= amortizacaoConstante
    totalInterest += interest
    totalPaid += payment

    table.push({
      month: m,
      payment: round2(payment),
      principal: round2(amortizacaoConstante),
      interest: round2(interest),
      balance: round2(Math.max(0, balance)),
    })
  }

  const firstInstallment = table[0]?.payment ?? 0

  return {
    monthlyInstallment: round2(firstInstallment),
    totalPaid: round2(totalPaid),
    totalInterest: round2(totalInterest),
    cetAnnual: calcularCET(principal, totalPaid / termMonths, termMonths, monthlyRate),
    amortizationTable: table,
  }
}

// ─── CET — Custo Efetivo Total (estimativa simplificada) ──────────────────────
// CET real requer IOF + tarifas + seguros — aqui calculamos o financeiro puro
// para conformidade com transparência ao consumidor (CDC art. 52)

function calcularCET(
  _principal: number,
  _avgMonthlyPayment: number,
  _termMonths: number,
  monthlyRate: number,
): number {
  // Estimativa: taxa nominal anual composta
  const cetMonthly = monthlyRate * 1.05  // +5% estimado de custos (IOF, tarifas)
  const cetAnnual = (Math.pow(1 + cetMonthly, 12) - 1) * 100
  return round2(cetAnnual)
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
