import Card from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { alquileresApi } from '../../services/alquileres'
import { useState } from 'react'

const Schema = z.object({
  clienteIdent: z.string().min(1, "Identificación de cliente requerida"),
  empleadoIdent: z.string().min(1, "Identificación de empleado requerida"),
  referencias: z.string().min(1, "Ingrese al menos una referencia"),
  fechaAlquiler: z.string().min(1, "Fecha requerida"),
})
type Schema = z.infer<typeof Schema>

export default function Alquileres() {
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<Schema>({ resolver: zodResolver(Schema) })
  const [num, setNum] = useState('');
  const [detalle, setDetalle] = useState<any>(null)
  const [fecha, setFecha] = useState('');
  const [lista, setLista] = useState<any[]>([])
  const [lastSuccess, setLastSuccess] = useState<{ numero: string, precioTotal: number } | null>(null)

  const onSubmit = async (d: Schema) => {
    try {
      const payload = {
        clienteIdent: d.clienteIdent,
        empleadoIdent: d.empleadoIdent,
        referencias: d.referencias.split(',').map(s => s.trim()).filter(Boolean),
        fechaAlquiler: d.fechaAlquiler,
      }
      const res = await alquileresApi.registrar(payload)
      setLastSuccess(res)
      reset()
      setTimeout(() => setLastSuccess(null), 8000)
    } catch (e: any) {
      alert(e.response?.data?.error || 'Error al registrar alquiler')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-xl font-bold text-slate-800">📝 Nuevo Alquiler</h2>
        <p className="mb-4 text-sm text-slate-500">
          Complete los datos para registrar un alquiler. El precio se calculará automáticamente según la estrategia vigente.
        </p>

        {lastSuccess && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 animate-in fade-in slide-in-from-top-2">
            <h3 className="text-lg font-bold text-green-800">¡Alquiler Registrado!</h3>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-green-600">Número de Alquiler</span>
                <span className="text-xl font-mono font-bold text-green-900">#{lastSuccess.numero}</span>
              </div>
              <div>
                <span className="block text-green-600">Precio Total Calculado</span>
                <span className="text-xl font-mono font-bold text-green-900">${lastSuccess.precioTotal}</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-green-700 opacity-80">
              * Incluye descuentos por cliente frecuente y recargos por prendas delicadas.
            </p>
          </div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 uppercase">Cliente ID</label>
              <Input placeholder="CC-1001" {...register('clienteIdent')} className={errors.clienteIdent ? 'border-red-500' : ''} />
              {errors.clienteIdent && <span className="text-xs text-red-500">{errors.clienteIdent.message}</span>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 uppercase">Empleado ID</label>
              <Input placeholder="EMP-900" {...register('empleadoIdent')} className={errors.empleadoIdent ? 'border-red-500' : ''} />
              {errors.empleadoIdent && <span className="text-xs text-red-500">{errors.empleadoIdent.message}</span>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 uppercase">Fecha de Alquiler</label>
            <Input type="date" {...register('fechaAlquiler')} className={errors.fechaAlquiler ? 'border-red-500' : ''} />
            {errors.fechaAlquiler && <span className="text-xs text-red-500">{errors.fechaAlquiler.message}</span>}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500 uppercase">Referencias de Prendas</label>
            <Input placeholder="REF-DAMA-001, REF-CAB-001" {...register('referencias')} className={errors.referencias ? 'border-red-500' : ''} />
            <p className="mt-1 text-xs text-slate-400">Separe múltiples referencias con comas.</p>
            {errors.referencias && <span className="text-xs text-red-500">{errors.referencias.message}</span>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2 w-full bg-slate-900 hover:bg-slate-800">
            {isSubmitting ? 'Procesando...' : 'Registrar y Calcular Precio'}
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-bold text-slate-800">🔍 Consultas</h2>

        <div className="mb-6 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <label className="mb-2 block text-xs font-bold text-slate-500 uppercase">Buscar por Número</label>
          <div className="flex gap-2">
            <Input placeholder="# Alquiler" value={num} onChange={e => setNum(e.target.value)} />
            <Button onClick={async () => {
              try { setDetalle(await alquileresApi.obtener(num)) } catch { setDetalle(null); alert('No encontrado') }
            }}>Buscar</Button>
          </div>

          {detalle && (
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm animate-in fade-in">
              <div className="flex justify-between items-start mb-2 border-b pb-2">
                <div>
                  <span className="text-2xl font-bold text-slate-800">#{detalle.numero}</span>
                  <div className="text-xs text-slate-500">{new Date(detalle.fechaAlquiler).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total</div>
                  {/* Note: If the backend doesn't store the total price in the DB, we might not see it here unless we calculate it again or store it. 
                      Assuming for now we just show the items. */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="block text-xs text-slate-400">Cliente</span>
                  <span className="font-medium">{detalle.cliente?.nombre}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Empleado</span>
                  <span className="font-medium">{detalle.empleado?.nombre}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded p-2">
                <span className="block text-xs font-bold text-slate-500 mb-2 uppercase">Prendas</span>
                <ul className="space-y-1">
                  {(detalle.prendas ?? []).map((p: any, i: number) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span>{p.prenda?.referencia} <span className="text-slate-400">({p.prenda?.talla})</span></span>
                      <span className="font-mono">x{p.cantidad}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold text-slate-500 uppercase">Historial por Fecha</label>
          <div className="flex gap-2 mb-4">
            <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
            <Button variant="ghost" onClick={async () => setLista(await alquileresApi.listarPorFecha(fecha))}>Listar</Button>
          </div>

          {!!lista.length && (
            <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {lista.map(a => (
                <li key={a.numero} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3 shadow-sm hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-bold text-slate-700">#{a.numero}</div>
                    <div className="text-xs text-slate-500">{new Date(a.fechaAlquiler).toLocaleDateString()}</div>
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    {a.prendas?.length ?? 0} prendas
                  </div>
                </li>
              ))}
            </ul>
          )}
          {lista.length === 0 && fecha && <p className="text-center text-sm text-slate-400">No hay alquileres en esta fecha.</p>}
        </div>
      </Card>
    </div>
  )
}
