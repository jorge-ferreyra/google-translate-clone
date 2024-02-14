import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: '200px' }

const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traduccion'
}

export function TextArea ({ type, loading, value, onChange }: Props) {
  const styles = type === SectionType.From 
    ? commonStyles
    : { ...commonStyles, backgroundColor: 'rgba(0, 0, 0, .2)' }
  return (
    <Form.Control as='textarea' autoFocus={type === SectionType.From} placeholder={getPlaceHolder({ type, loading })} style={styles} value={value} />
  )
}