export default function Success() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Pagamento Bem-Sucedido!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sua assinatura foi ativada. Você receberá um email de confirmação em breve.
          </p>
        </div>
        <div className="text-center">
          <a
            href="/dashboard"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Ir para Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}