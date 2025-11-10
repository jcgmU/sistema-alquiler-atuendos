import Card from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Select } from '../../components/ui/Select'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { prendasApi, type CrearPrendaDTO, type TipoTraje } from '../../services/prendas'

const Schema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('DAMA'),
    referencia: z.string().min(1),
    talla: z.string().min(1),
    color: z.string().optional(),
    marca: z.string().optional(),
    valorAlquiler: z.number().nonnegative(),
    pedreria: z.boolean(),
    largoCorto: z.enum(['LARGO','CORTO']),
    cantidadPiezas: z.number().int().positive(),
  }),
  z.object({
    tipo: z.literal('CABALLERO'),
    referencia: z.string().min(1),
    talla: z.string().min(1),
    color: z.string().optional(),
    marca: z.string().optional(),
    valorAlquiler: z.number().nonnegative(),
    tipoTraje: z.enum(['FRAC','SMOKING','CLASICO']),
    accesorio: z.enum(['CORBATA','CORBATIN']),
  }),
  z.object({
    tipo: z.literal('DISFRAZ'),
    referencia: z.string().min(1),
    talla: z.string().min(1),
    valorAlquiler: z.number().nonnegative(),
    nombreDisfraz: z.string().min(1),
  }),
])
type Schema = z.infer<typeof Schema>

export default function Prendas() {
  const { control, register, watch, handleSubmit, reset, formState:{isSubmitting} } =
    useForm<Schema>({ resolver: zodResolver(Schema), defaultValues: { tipo:'DAMA', valorAlquiler:0 } as any })
  const tipo = watch('tipo')

  const [talla, setTalla] = useState('')
  const [result, setResult] = useState<Record<string, any[]> | null>(null)

  const [refPadre, setRefPadre] = useState('')
  const [refHijo, setRefHijo] = useState('')
  const [cant, setCant] = useState(1)

  const [refBuscar, setRefBuscar] = useState('')
  const [detalle, setDetalle] = useState<any>(null)
  const [costo, setCosto] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Crear prenda</h2>
        <form className="grid gap-3" onSubmit={handleSubmit(async (d)=>{
          await prendasApi.crear(d as CrearPrendaDTO); alert('Prenda creada'); reset()
        })}>
          <div className="grid grid-cols-2 gap-3">
            <Select {...register('tipo')}>
              <option value="DAMA">Dama</option>
              <option value="CABALLERO">Caballero</option>
              <option value="DISFRAZ">Disfraz</option>
            </Select>
            <Input placeholder="Referencia" {...register('referencia')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Talla" {...register('talla')} />
            {'color' in ({} as any) && <></>}
            <Input placeholder="Color" {...register('color' as any)} />
          </div>
          {tipo !== 'DISFRAZ' && (
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Marca" {...register('marca' as any)} />
              <Controller control={control} name="valorAlquiler" render={({field})=>(
                <Input type="number" placeholder="Valor alquiler" {...field} onChange={e=>field.onChange(+e.target.value)} />
              )}/>
            </div>
          )}
          {tipo === 'DAMA' && (
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="grid grid-cols-3 gap-3">
                <Select {...register('largoCorto')}><option value="LARGO">Largo</option><option value="CORTO">Corto</option></Select>
                <Input type="number" placeholder="Piezas" {...register('cantidadPiezes' as any)} />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('pedreria')} /> Pedrería</label>
              </div>
            </div>
          )}
          {tipo === 'CABALLERO' && (
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="grid grid-cols-2 gap-3">
                <Select {...register('tipoTraje')}>
                  {(['FRAC','SMOKING','CLASICO'] as TipoTraje[]).map(t=><option key={t} value={t}>{t}</option>)}
                </Select>
                <Select {...register('accesorio')}>
                  <option value="CORBATA">Corbata</option>
                  <option value="CORBATIN">Corbatín</option>
                </Select>
              </div>
            </div>
          )}
          {tipo === 'DISFRAZ' && (
            <>
              <Controller control={control} name="valorAlquiler" render={({field})=>(
                <Input type="number" placeholder="Valor alquiler" {...field} onChange={e=>field.onChange(+e.target.value)} />
              )}/>
              <Input placeholder="Nombre del disfraz" {...register('nombreDisfraz' as any)} />
            </>
          )}
          <Button type="submit" disabled={isSubmitting}>Guardar</Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Búsqueda / Composite / Costo total</h2>

        <div className="mb-3 flex gap-2">
          <Input placeholder="Buscar por talla (p.e. M)" value={talla} onChange={e=>setTalla(e.target.value)} />
          <Button onClick={async ()=>setResult(await prendasApi.listar(talla))}>Buscar</Button>
        </div>
        {result && Object.keys(result).length>0 && (
          <div className="space-y-3 text-sm">
            {Object.entries(result).map(([grupo, items])=>(
              <div key={grupo} className="rounded-xl bg-slate-50 p-3">
                <div className="mb-2 text-xs uppercase text-muted">{grupo}</div>
                <ul className="space-y-1">
                  {(items as any[]).map(it=>(
                    <li key={it.referencia} className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm">
                      <span><b>{it.referencia}</b> • {it.talla} • ${it.valorAlquiler}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Input placeholder="Ref. padre" value={refPadre} onChange={e=>setRefPadre(e.target.value)} />
          <Input placeholder="Ref. componente" value={refHijo} onChange={e=>setRefHijo(e.target.value)} />
          <Input type="number" placeholder="Cant" value={cant} onChange={e=>setCant(+e.target.value)} />
        </div>
        <div className="mt-2 flex gap-2">
          <Button variant="ghost" onClick={async ()=>{ await prendasApi.agregarComponente(refPadre, refHijo, cant); alert('Componente agregado') }}>Agregar componente</Button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Input placeholder="Ref. prenda" value={refBuscar} onChange={e=>setRefBuscar(e.target.value)} />
          <Button variant="ghost" onClick={async ()=>setDetalle(await prendasApi.obtener(refBuscar))}>Obtener</Button>
          <Button variant="ghost" onClick={async ()=>setCosto((await prendasApi.costoTotal(refBuscar)).total)}>Costo total</Button>
        </div>
        {detalle && <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">
          <b>{detalle.referencia}</b> • {detalle.tipo} • Talla {detalle.talla} • ${detalle.valorAlquiler}
        </div>}
        {costo!=null && <div className="mt-2 text-sm"><b>Costo total:</b> ${costo}</div>}
      </Card>
    </div>
  )
}
