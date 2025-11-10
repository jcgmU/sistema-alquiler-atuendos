import Card from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { empleadosApi } from '../../services/empleados'
import { useState } from 'react'

const Schema = z.object({
  identificacion: z.string().min(1),
  nombre: z.string().min(1),
  cargo: z.string().min(1),
  telefono: z.string().optional(),
})
type Schema = z.infer<typeof Schema>

export default function Empleados() {
  const { register, handleSubmit, reset, formState:{isSubmitting} } =
    useForm<Schema>({ resolver: zodResolver(Schema) })

  const [id, setId] = useState(''); const [emp, setEmp] = useState<any>(null)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Crear empleado</h2>
        <form className="grid gap-3" onSubmit={handleSubmit(async d=>{
          await empleadosApi.crear(d); alert('Empleado creado'); reset()
        })}>
          <Input placeholder="Identificación" {...register('identificacion')} />
          <Input placeholder="Nombre" {...register('nombre')} />
          <Input placeholder="Cargo" {...register('cargo')} />
          <Input placeholder="Teléfono" {...register('telefono')} />
          <Button type="submit" disabled={isSubmitting}>Guardar</Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Consultar empleado</h2>
        <div className="flex gap-2">
          <Input placeholder="Identificación" value={id} onChange={e=>setId(e.target.value)} />
          <Button onClick={async ()=>setEmp(await empleadosApi.obtener(id))}>Buscar</Button>
        </div>
        {emp && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
            <div><b>Nombre:</b> {emp.nombre}</div>
            <div><b>Cargo:</b> {emp.cargo}</div>
            <div><b>Tel:</b> {emp.telefono ?? '—'}</div>
          </div>
        )}
      </Card>
    </div>
  )
}
