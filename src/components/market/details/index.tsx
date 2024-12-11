import { Text, View } from 'react-native'
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native'
import { s } from './styles'

export type DetailsProps = {
  name: string
  description: string
  adddress: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

type TDetails = {
  data: DetailsProps
}

export function Details({ data }: TDetails) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
      </View>
    </View>
  )
}
