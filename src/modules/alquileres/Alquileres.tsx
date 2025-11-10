import Card from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { alquileresApi } from '../../services/alquileres'
import { useState } from 'react'

const Schema = z.object({
  clienteIdent: z.string().min(1),
  empleadoIdent: z.string().min(1),
  referencias: z.string().min(1), // coma separadas
  fechaAlquiler: z.string().min(1),
})
type Schema = z.infer<typeof Schema>

export default function Alquileres() {
  const { register, handleSubmit, reset, formState:{isSubmitting} } = useForm<Schema>({ resolver: zodResolver(Schema) })
  const [num, setNum] = useState(''); const [detalle, setDetalle] = useState<any>(null)
  const [fecha, setFecha] = useState(''); const [lista, setLista] = useState<any[]>([])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Registrar alquiler</h2>
        <form className="grid gap-3" onSubmit={handleSubmit(async (d)=>{
          const payload = {
            clienteIdent: d.clienteIdent,
            empleadoIdent: d.empleadoIdent,
            referencias: d.referencias.split(',').map(s=>s.trim()).filter(Boolean),
            fechaAlquiler: d.fechaAlquiler,
          }
          const res = await alquileresApi.registrar(payload)
          alert(`Alquiler #${res.numero} creado`)
          reset()
        })}>
          <Input placeholder="Identificación cliente" {...register('clienteIdent')} />
          <Input placeholder="Identificación empleado" {...register('empleadoIdent')} />
          <Input placeholder="Referencias (coma separadas)" {...register('referencias')} />
          <Input type="date" {...register('fechaAlquiler')} />
          <Button type="submit" disabled={isSubmitting}>Registrar</Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Consultar</h2>
        <div className="mb-3 flex gap-2">
          <Input placeholder="# Alquiler" value={num} onChange={e=>setNum(e.target.value)} />
          <Button onClick={async ()=>setDetalle(await alquileresApi.obtener(num))}>Por número</Button>
        </div>
        {detalle && (
          <div className="rounded-xl bg-slate-50 p-3 text-sm">
            <div><b>#{detalle.numero}</b> • {new Date(detalle.fechaAlquiler).toLocaleDateString()}</div>
            <div>Cliente: {detalle.cliente?.nombre} — Empleado: {detalle.empleado?.nombre}</div>
            <ul className="mt-2 list-disc pl-4">{(detalle.prendas??[]).map((p:any,i:number)=>(
              <li key={i}>{p.prenda?.referencia} ({p.prenda?.talla}) × {p.cantidad}</li>
            ))}</ul>
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <Input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} />
          <Button variant="ghost" onClick={async ()=>setLista(await alquileresApi.listarPorFecha(fecha))}>Por fecha</Button>
        </div>
        {!!lista.length && (
          <ul className="mt-3 space-y-2 text-sm">
            {lista.map(a=>(
              <li key={a.numero} className="rounded-lg bg-white p-3 shadow-sm">
                <b>#{a.numero}</b> • {new Date(a.fechaAlquiler).toLocaleDateString()} • {a.prendas?.length ?? 0} prendas
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
