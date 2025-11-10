import Card from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientesApi } from '../../services/clientes'
import { useState } from 'react'

const ClienteSchema = z.object({
  identificacion: z.string().min(1),
  nombre: z.string().min(1),
  email: z.string().email().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
})
type ClienteSchema = z.infer<typeof ClienteSchema>

export default function Clientes() {
  const { register, handleSubmit, reset, formState:{ isSubmitting } } =
    useForm<ClienteSchema>({ resolver: zodResolver(ClienteSchema) })

  const [searchId, setSearchId] = useState('')
  const [cliente, setCliente] = useState<any>(null)
  const [servicios, setServicios] = useState<any[]>([])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Crear cliente</h2>
        <form className="grid gap-3" onSubmit={handleSubmit(async (d)=>{
          await clientesApi.crear(d)
          alert('Cliente creado'); reset()
        })}>
          <Input placeholder="Identificación" {...register('identificacion')} />
          <Input placeholder="Nombre" {...register('nombre')} />
          <Input placeholder="Email" {...register('email')} />
          <Input placeholder="Teléfono" {...register('telefono')} />
          <Input placeholder="Dirección" {...register('direccion')} />
          <Button type="submit" disabled={isSubmitting}>Guardar</Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Consultar cliente</h2>
        <div className="flex gap-2">
          <Input placeholder="Identificación" value={searchId} onChange={e=>setSearchId(e.target.value)} />
          <Button onClick={async ()=>{ setCliente(await clientesApi.obtener(searchId)) }}>Buscar</Button>
          <Button variant="ghost" onClick={()=>{ setCliente(null); setServicios([]) }}>Limpiar</Button>
        </div>

        {cliente && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
            <div><b>Nombre:</b> {cliente.nombre}</div>
            <div><b>Email:</b> {cliente.email ?? '—'}</div>
            <div><b>Tel:</b> {cliente.telefono ?? '—'}</div>
            <div><b>Dir:</b> {cliente.direccion ?? '—'}</div>

            <div className="mt-4 flex gap-2">
              <Button variant="ghost" onClick={async ()=>setServicios(await clientesApi.obtenerServicios(searchId, true))}>Vigentes</Button>
              <Button variant="ghost" onClick={async ()=>setServicios(await clientesApi.obtenerServicios(searchId, false))}>Todos</Button>
            </div>

            {!!servicios.length && (
              <ul className="mt-3 space-y-2">
                {servicios.map((s:any)=>(
                  <li key={s.numero} className="rounded-lg bg-white p-3 shadow-sm text-sm">
                    <b>#{s.numero}</b> • Alquiler: {new Date(s.fechaAlquiler).toLocaleDateString()} • Prendas: {s.prendas?.length ?? 0}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
