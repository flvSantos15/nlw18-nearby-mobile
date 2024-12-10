import { View, Text } from 'react-native'

import { colors } from '@/styles/theme'
import { s } from './styles'

interface IStep {
  title: string
  description: string
}

export function Step({ title, description }: IStep) {
  return (
    <View style={s.container}>
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  )
}