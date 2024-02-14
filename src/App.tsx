import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import './App.css'
import { useTranslate } from './hooks/useTranslate'
import { AUTO_LANGUAGE } from './const'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

function App() {
  const { loading, fromLanguage, toLanguage, fromText, result,
  interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useTranslate()
  return (
    <>
      <Container fluid>
        <h2>Google Translate</h2>
        <Row>

          <Stack gap={2}>
            <Col>
              <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
              <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
            </Col>
          </Stack>

          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Stack gap={2}>
          <Col>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            <TextArea type={SectionType.To} value={result} onChange={setResult} loading={loading} />
          </Col>
          </Stack>

        </Row>
      </Container>
    </>
  )
}

export default App
