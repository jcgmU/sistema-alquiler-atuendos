import Card from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useEffect, useState } from 'react'
import { lavanderiaApi, type ItemLavanderia } from '../../services/lavanderia'

export default function Lavanderia() {
  const [ref, setRef] = useState('')
  const [flags, setFlags] = useState({ manchada: false, delicada: false, urgente: false })
  const [cola, setCola] = useState<ItemLavanderia[]>([])
  const [cant, setCant] = useState(1)
  const [lastResult, setLastResult] = useState<{ loteId: string, cantidad: number } | null>(null)

  const cargar = async () => setCola(await lavanderiaApi.listarCola())
  useEffect(() => { cargar() }, [])

  const handleEncolar = async () => {
    if (!ref) return;
    try {
      await lavanderiaApi.registrar({ referencia: ref, ...flags })
      setRef('')
      setFlags({ manchada: false, delicada: false, urgente: false })
      await cargar()
    } catch (e: any) {
      alert(e.response?.data?.error || 'Error al encolar')
    }
  }

  const handleEnviar = async () => {
    try {
      const res = await lavanderiaApi.enviarALavar(cant)
      setLastResult(res)
      await cargar()
      setTimeout(() => setLastResult(null), 5000) // Clear message after 5s
    } catch (e: any) {
      alert(e.response?.data?.error || 'Error al enviar')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-xl font-bold text-slate-800">📥 Recepción de Prendas</h2>
        <p className="mb-4 text-sm text-slate-500">
          Registra las prendas que llegan para limpieza. El sistema calculará automáticamente la prioridad.
        </p>
        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Referencia de Prenda</label>
            <Input
              placeholder="Ej. REF-DAMA-001"
              value={ref}
              onChange={e => setRef(e.target.value)}
            />
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
            <span className="mb-2 block text-sm font-medium text-slate-700">Condiciones (afectan prioridad)</span>
            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-slate-200 transition-colors">
                <input type="checkbox" className="accent-indigo-600" checked={flags.manchada} onChange={e => setFlags(f => ({ ...f, manchada: e.target.checked }))} />
                <span className="text-sm">Manchada (+Puntos)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-slate-200 transition-colors">
                <input type="checkbox" className="accent-indigo-600" checked={flags.delicada} onChange={e => setFlags(f => ({ ...f, delicada: e.target.checked }))} />
                <span className="text-sm">Delicada (+Puntos)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-slate-200 transition-colors">
                <input type="checkbox" className="accent-indigo-600" checked={flags.urgente} onChange={e => setFlags(f => ({ ...f, urgente: e.target.checked }))} />
                <span className="text-sm font-bold text-red-600">Urgente (Prioridad Max)</span>
              </label>
            </div>
          </div>

          <Button onClick={handleEncolar} className="w-full bg-indigo-600 hover:bg-indigo-700">
            Agregar a Cola
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">🔄 Cola de Procesamiento</h2>
          <Badge color="slate">{cola.length} pendientes</Badge>
        </div>

        <div className="mb-6 rounded-lg bg-indigo-50 p-4 border border-indigo-100">
          <h3 className="mb-2 text-sm font-semibold text-indigo-900">Procesar Lote (Command + Iterator)</h3>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              max={cola.length || 1}
              value={cant}
              onChange={e => setCant(+e.target.value)}
              className="w-24"
            />
            <Button variant="primary" onClick={handleEnviar} disabled={cola.length === 0}>
              Enviar a Lavandería
            </Button>
          </div>
          {lastResult && (
            <div className="mt-3 rounded bg-green-100 p-2 text-sm text-green-800 border border-green-200 animate-in fade-in slide-in-from-top-1">
              ✅ <b>¡Lote enviado!</b> Se creó el Lote #{lastResult.loteId} con {lastResult.cantidad} prendas.
            </div>
          )}
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {cola.length === 0 && <p className="text-center text-sm text-slate-400 py-8">La cola está vacía</p>}
          {cola.map((it) => (
            <div key={it.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3 shadow-sm transition-all hover:shadow-md">
              <div>
                <div className="font-bold text-slate-800">{it.prenda?.referencia ?? it.prendaId}</div>
                <div className="text-xs text-slate-500">
                  {new Date(it.fechaRegistro).toLocaleString()}
                </div>
              </div>
              <Badge color={it.prioridad === 'URGENTE' ? 'danger' : it.prioridad === 'ALTA' ? 'warning' : 'success'}>
                {it.prioridad}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
