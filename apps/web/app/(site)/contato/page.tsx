import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a Troller. SAC, imprensa, concessionárias e mais.',
}

export default function ContatoPage() {
  return (
    <div className="bg-brand-black min-h-screen">
      <section className="pt-40 pb-16 bg-brand-darker/50 border-b border-brand-mid/20">
        <div className="container-site">
          <p className="text-xs font-bold font-condensed uppercase tracking-[0.3em] text-accent mb-3">
            Fale Conosco
          </p>
          <h1 className="text-display-lg font-display text-white">
            ESTAMOS AQUI{' '}
            <span className="text-gradient-accent">PARA AJUDAR</span>
          </h1>
        </div>
      </section>

      <section className="section-py container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações */}
          <div className="flex flex-col gap-8">
            {[
              {
                title: 'SAC — Serviço de Atendimento ao Cliente',
                items: [
                  { label: 'Telefone', value: '0800 072 0200 (gratuito)' },
                  { label: 'E-mail', value: 'sac@troller.com.br' },
                  { label: 'Horário', value: 'Segunda a sexta, das 8h às 18h' },
                ],
              },
              {
                title: 'Imprensa',
                items: [
                  { label: 'E-mail', value: 'imprensa@troller.com.br' },
                ],
              },
              {
                title: 'Escritório Central',
                items: [
                  { label: 'Endereço', value: 'Rodovia BR-232, Km 0 — [Cidade], [Estado] — Brasil' },
                  { label: 'CNPJ', value: '[00.000.000/0001-00]' },
                ],
              },
            ].map(section => (
              <div key={section.title} className="glass rounded-xl p-6">
                <h2 className="text-base font-display text-white mb-4">{section.title}</h2>
                <dl className="flex flex-col gap-2">
                  {section.items.map(({ label, value }) => (
                    <div key={label} className="flex gap-3">
                      <dt className="text-xs text-brand-subtle uppercase tracking-wider min-w-[80px]">{label}</dt>
                      <dd className="text-sm text-brand-light">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Formulário */}
          <div className="glass rounded-xl p-8">
            <h2 className="text-lg font-display text-white mb-6">Envie uma Mensagem</h2>
            <form className="flex flex-col gap-4" aria-label="Formulário de contato">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="text-xs text-brand-subtle uppercase tracking-wider block mb-1.5">Nome</label>
                  <input id="nome" type="text" autoComplete="name" className="w-full bg-brand-darker border border-brand-mid rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label htmlFor="sobrenome" className="text-xs text-brand-subtle uppercase tracking-wider block mb-1.5">Sobrenome</label>
                  <input id="sobrenome" type="text" autoComplete="family-name" className="w-full bg-brand-darker border border-brand-mid rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="email-contato" className="text-xs text-brand-subtle uppercase tracking-wider block mb-1.5">E-mail</label>
                <input id="email-contato" type="email" autoComplete="email" className="w-full bg-brand-darker border border-brand-mid rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label htmlFor="assunto" className="text-xs text-brand-subtle uppercase tracking-wider block mb-1.5">Assunto</label>
                <select id="assunto" className="w-full bg-brand-darker border border-brand-mid rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors">
                  <option>Informações sobre produtos</option>
                  <option>Financiamento</option>
                  <option>Pós-venda e garantia</option>
                  <option>Recall</option>
                  <option>Imprensa</option>
                  <option>Outros</option>
                </select>
              </div>
              <div>
                <label htmlFor="mensagem" className="text-xs text-brand-subtle uppercase tracking-wider block mb-1.5">Mensagem</label>
                <textarea id="mensagem" rows={5} className="w-full bg-brand-darker border border-brand-mid rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors resize-none" />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="lgpd-contato" className="mt-1 accent-[#E85D04]" />
                <label htmlFor="lgpd-contato" className="text-xs text-brand-subtle leading-relaxed">
                  Concordo com o tratamento dos meus dados conforme a{' '}
                  <a href="/privacidade" className="text-accent hover:underline">Política de Privacidade</a>{' '}
                  da Troller (LGPD).
                </label>
              </div>
              <button
                type="submit"
                id="enviar-contato"
                className="w-full py-4 bg-accent text-white font-display hover:bg-accent-dark transition-colors rounded"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
