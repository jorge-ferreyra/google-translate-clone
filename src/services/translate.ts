import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { type FromLanguage, type Language } from '../types.d'
import { SUPPORTED_LANGUAGES } from '../const'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a IA that translates text. You receive a text from the user. Do not answer, just translate the text. The origial language is surrrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola mundo {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello World'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[Deutsch]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Bon dia, com estas? {{auto}} [[Español]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos dias, ¿como estas?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]
  
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  return completion.data.choices[0]?.message?.content
}