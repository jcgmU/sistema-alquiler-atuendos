import { useQuery } from '@tanstack/react-query'
import { http } from '../../lib/http'
import Card from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    // Health según tu spec: GET /
    queryFn: async () => (await http.get<{ ok: boolean }>('/')).data,
  })

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Estado del sistema</h2>
          <Badge color={data?.ok ? 'success' : 'danger'}>
            {isLoading ? 'Comprobando…' : isError ? 'Error' : data?.ok ? 'OK' : 'Desconocido'}
          </Badge>
        </div>
        <p className="text-sm text-slate-600">Backend: <code>{import.meta.env.VITE_API_BASE_URL}</code></p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric title="Clientes" value="—" />
          <Metric title="Prendas" value="—" />
          <Metric title="En Lavandería" value="—" />
        </div>
        <p className="mt-4 text-xs text-muted">* Métricas se activarán cuando el backend exponga endpoints de conteo.</p>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Atajos</h2>
        <ul className="space-y-2 text-sm">
          <li>• Registrar cliente</li>
          <li>• Crear prenda</li>
          <li>• Registrar alquiler</li>
          <li>• Encolar en lavandería</li>
        </ul>
      </Card>
    </div>
  )
}
function Metric({ title, value }: {title: string; value: string}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-sm text-muted">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  )
}
