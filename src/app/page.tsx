import Logo from '@/components/Logo'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/planos" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Planos
          </a>
          <a href="#cobertura" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Verificar Cobertura
          </a>
          <a href="#suporte" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Suporte
          </a>
          <a href="#sobre" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Sobre
          </a>
        </nav>
        <div className="flex items-center space-x-6">
          <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Entrar
          </a>
          <a href="/registro" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors text-white">
            Teste Grátis
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900">
            Internet Ilimitada
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Conecte-se com velocidade e estabilidade. Planos a partir de R$ 29,90/mês.
          </p>
          <p className="text-lg mb-4 text-gray-700">
            Pronto para navegar? Digite seu email para criar ou reiniciar sua assinatura.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Endereço de email"
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <button className="bg-sky-500 hover:bg-sky-600 px-8 py-3 rounded-lg font-semibold text-white transition-colors shadow-lg">
              Assinar Agora
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-2 bg-gray-800"></div>

      {/* Plans Section */}
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Escolha seu Plano
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Básico */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-6.938-6.5a8.5 8.5 0 1113.876 0 8.5 8.5 0 01-13.876 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Básico</h3>
                <p className="text-4xl font-bold text-gray-900 mb-1">R$ 29,90<span className="text-lg font-normal text-gray-600">/mês</span></p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Até 50 Mbps
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Wi-Fi incluído
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Suporte por chat
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instalação gratuita
                </li>
              </ul>
              <a href="/planos" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors inline-block text-center">
                Escolher Plano
              </a>
            </div>

            {/* Plano Premium */}
            <div className="bg-sky-500 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-sky-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-sky-600 text-white px-4 py-1 rounded-full text-sm font-medium">Mais Popular</span>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <p className="text-4xl font-bold text-white mb-1">R$ 79,90<span className="text-lg font-normal text-sky-100">/mês</span></p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Até 200 Mbps
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Wi-Fi mesh
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Suporte prioritário 24/7
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Modem avançado
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sem limite de dados
                </li>
              </ul>
              <a href="/planos" className="w-full bg-white text-sky-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-block text-center">
                Escolher Plano
              </a>
            </div>

            {/* Plano Ultra */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ultra</h3>
                <p className="text-4xl font-bold text-gray-900 mb-1">R$ 119,90<span className="text-lg font-normal text-gray-600">/mês</span></p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Até 500 Mbps
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Wi-Fi 6
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Suporte VIP
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Roteador gamer
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  IP fixo opcional
                </li>
              </ul>
              <a href="/planos" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors inline-block text-center">
                Escolher Plano
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-200"></div>

      {/* Coverage Check Section */}
      <section className="py-16 px-4 md:px-12 bg-gradient-to-r from-blue-50 to-sky-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Verifique sua cobertura
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Digite seu CEP e descubra se a Linket está disponível na sua região. Instalação gratuita e sem fidelidade.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Digite seu CEP"
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={9}
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors text-white whitespace-nowrap">
                Verificar
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Exemplo: 01234-567
            </p>
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-800"></div>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Por que escolher a Linket?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Tecnologia de ponta e atendimento excepcional para conectar você ao futuro da internet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Fibra Óptica</h3>
              <p className="text-gray-600">Tecnologia de ponta com fibra óptica até sua casa. Velocidade simétrica e conexão estável 24/7.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Sem Oscilação</h3>
              <p className="text-gray-600">Conexão estável sem quedas ou oscilações. Trabalhe, estude e divirta-se sem interrupções.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Instalação Rápida</h3>
              <p className="text-gray-600">Agendamento em até 24 horas. Instalação profissional e gratuita em sua residência.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-200"></div>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-12 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Milhares de clientes satisfeitos com nossa internet de alta qualidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sky-600 font-bold text-lg">MC</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Maria Clara</h4>
                  <p className="text-gray-600 text-sm">Empresária, São Paulo</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {'★'.repeat(5)}
              </div>
              <p className="text-gray-700 italic">
                &ldquo;A Linket transformou meu home office. Velocidade consistente e suporte incrível. Recomendo para todos os profissionais que precisam de internet confiável.&rdquo;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sky-600 font-bold text-lg">RF</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Roberto Fernandes</h4>
                  <p className="text-gray-600 text-sm">Professor, Rio de Janeiro</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {'★'.repeat(5)}
              </div>
              <p className="text-gray-700 italic">
                &ldquo;Depois de anos com internet instável, finalmente encontrei a Linket. Meus alunos podem assistir às aulas online sem interrupções. Serviço excepcional!&rdquo;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sky-600 font-bold text-lg">AS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ana Silva</h4>
                  <p className="text-gray-600 text-sm">Designer, Belo Horizonte</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {'★'.repeat(5)}
              </div>
              <p className="text-gray-700 italic">
                &ldquo;Como designer, preciso de upload rápido para enviar arquivos grandes. A Linket entrega exatamente o que promete. Interface do modem também é moderna e fácil de usar.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-200"></div>

      {/* Section 1 */}
      <section className="py-16 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Navegue em qualquer dispositivo.
            </h2>
            <p className="text-xl text-gray-600">
              Conecte Smartphones, tablets, laptops, Smart TVs, consoles e muito mais com nossos planos de internet.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Devices"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-200"></div>

      {/* Section 2 */}
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="WiFi Router"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Wi-Fi ultrarrápido.
            </h2>
            <p className="text-xl text-gray-600">
              Conecte todos os seus dispositivos com velocidade de até 500 Mbps. Sem limites de dados.
            </p>
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-800"></div>

      {/* Section 3 */}
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Suporte 24/7.
            </h2>
            <p className="text-xl text-gray-600">
              Nossa equipe está sempre pronta para ajudar. Suporte técnico completo e instalação gratuita.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Support"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-200"></div>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            <details className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">O que é a Linket?</summary>
              <p className="mt-4 text-gray-600">
                A Linket é um provedor de internet que oferece conexão de alta velocidade com fibra óptica, planos flexíveis e suporte completo.
              </p>
            </details>
            <details className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">Como verificar se tenho cobertura?</summary>
              <p className="mt-4 text-gray-600">
                Digite seu CEP no campo &ldquo;Verificar Cobertura&rdquo; acima. Nossa tecnologia de fibra óptica está disponível em diversas regiões metropolitanas.
              </p>
            </details>
            <details className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">Quanto custa a internet da Linket?</summary>
              <p className="mt-4 text-gray-600">
                Nossos planos começam em R$ 29,90/mês para 50 Mbps. Temos opções até 500 Mbps. Sem fidelidade e instalação gratuita.
              </p>
            </details>
            <details className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">Como funciona a instalação?</summary>
              <p className="mt-4 text-gray-600">
                Agendamos a instalação gratuita em sua casa em até 24 horas. Nossa equipe instala o modem e configura tudo para você começar a navegar imediatamente.
              </p>
            </details>
            <details className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">O modem é incluído?</summary>
              <p className="mt-4 text-gray-600">
                Sim! O modem Wi-Fi de última geração está incluído em todos os planos, sem custo adicional. Ele suporta as mais recentes tecnologias Wi-Fi.
              </p>
            </details>
            <details className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">Há limite de dados?</summary>
              <p className="mt-4 text-gray-600">
                Não! Todos os nossos planos oferecem internet ilimitada. Navegue, baixe e assista quanto quiser sem preocupações.
              </p>
            </details>
            <details className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">Qual a velocidade real da internet?</summary>
              <p className="mt-4 text-gray-600">
                Garantimos a velocidade contratada. Se não atingir, você não paga. Monitoramos constantemente para manter a qualidade.
              </p>
            </details>
          </div>
        </div>
      </section>

      <div className="h-2 bg-gray-200"></div>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <a href="/planos" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Planos</a>
              <a href="#cobertura" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Verificar Cobertura</a>
              <a href="/dashboard" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Suporte</a>
            </div>
            <div>
              <a href="#teste-velocidade" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Teste de Velocidade</a>
              <a href="#instalacao" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Instalação</a>
              <a href="#contato" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Contato</a>
            </div>
            <div>
              <a href="#sobre" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Sobre nós</a>
              <a href="#carreiras" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Carreiras</a>
              <a href="#blog" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Blog</a>
            </div>
            <div>
              <a href="#termos" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Termos de uso</a>
              <a href="#privacidade" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Privacidade</a>
              <a href="#cookies" className="block font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-colors">Política de cookies</a>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <select className="bg-white text-gray-900 border border-gray-300 px-4 py-2 rounded-lg hover:border-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option>Português</option>
              <option>Inglês</option>
            </select>
            <p className="text-gray-600">Linket Brasil</p>
          </div>
        </div>
      </footer>
    </div>
  )
}