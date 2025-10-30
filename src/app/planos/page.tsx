export default function Planos() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Planos de Assinatura
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Escolha o plano ideal para você e comece a gerar receita recorrente.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Plano Básico */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900">Básico</h2>
            <p className="mt-4 text-gray-600">Perfeito para iniciantes.</p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-gray-900">R$ 29</span>
              <span className="text-gray-600">/mês</span>
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">Acesso básico</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">Suporte por email</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Assinar Básico
            </button>
          </div>

          {/* Plano Premium */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-900">Premium</h2>
            <p className="mt-4 text-gray-600">Para usuários avançados.</p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-gray-900">R$ 59</span>
              <span className="text-gray-600">/mês</span>
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">Tudo do Básico</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">Recursos avançados</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">Suporte prioritário</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Assinar Premium
            </button>
          </div>

          {/* Plano Empresarial */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900">Empresarial</h2>
            <p className="mt-4 text-gray-600">Para equipes e empresas.</p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-gray-900">R$ 99</span>
              <span className="text-gray-600">/mês</span>
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">Tudo do Premium</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">Múltiplos usuários</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✓</span>
                <span className="ml-2 text-gray-600">API dedicada</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Assinar Empresarial
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}