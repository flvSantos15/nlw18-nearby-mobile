import { Welcome } from '@/components/welcome'
import { View, Text } from 'react-native'

export default function Home() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
    </View>
  )
}
