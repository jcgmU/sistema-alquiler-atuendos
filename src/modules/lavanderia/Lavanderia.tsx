import Card from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useEffect, useState } from 'react'
import { lavanderiaApi } from '../../services/lavanderia'

export default function Lavanderia() {
  const [ref, setRef] = useState('')
  const [flags, setFlags] = useState({ manchada:false, delicada:false, urgente:false })
  const [cola, setCola] = useState<any[]>([])
  const [cant, setCant] = useState(1)

  const cargar = async () => setCola(await lavanderiaApi.listarCola())
  useEffect(()=>{ cargar() }, [])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Registrar en cola</h2>
        <div className="grid gap-3">
          <Input placeholder="Referencia" value={ref} onChange={e=>setRef(e.target.value)} />
          <div className="flex flex-wrap gap-3 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={flags.manchada} onChange={e=>setFlags(f=>({...f,manchada:e.target.checked}))}/> Manchada</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={flags.delicada} onChange={e=>setFlags(f=>({...f,delicada:e.target.checked}))}/> Delicada</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={flags.urgente} onChange={e=>setFlags(f=>({...f,urgente:e.target.checked}))}/> Urgente</label>
          </div>
          <Button onClick={async ()=>{
            await lavanderiaApi.registrar({ referencia:ref, ...flags }); await cargar(); setRef('')
          }}>Encolar</Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Cola de lavandería</h2>
        <div className="mb-3 flex items-center gap-2">
          <Input type="number" value={cant} onChange={e=>setCant(+e.target.value)} />
          <Button variant="ghost" onClick={async ()=>{ await lavanderiaApi.enviarALavar(cant); await cargar() }}>Enviar N</Button>
          <Button variant="ghost" onClick={cargar}>Refrescar</Button>
        </div>
        <ul className="space-y-2 text-sm">
          {cola.map((it:any)=>(
            <li key={it.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
              <div><b>{it.prenda?.referencia ?? it.prendaId}</b> • {new Date(it.fechaRegistro).toLocaleString()}</div>
              <Badge color={it.prioridad === 'URGENTE' ? 'danger' : it.prioridad === 'ALTA' ? 'success' : 'slate'}>
                {it.prioridad}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
