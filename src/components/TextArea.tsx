import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import React from 'react'

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traduccion'
}

export function TextArea ({ type, loading, value, onChange }: Props) {
  const styles = type === SectionType.From 
    ? commonStyles
    : { ...commonStyles, backgroundColor: 'rgba(0, 0, 0, .2)' }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value)
    }

  return (
    <Form.Control 
      as='textarea'
      autoFocus={type === SectionType.From}
      placeholder={getPlaceHolder({ type, loading })}
      style={styles}
      value={value}
      disabled={type === SectionType.To}
      onChange={handleChange} />
  )
}