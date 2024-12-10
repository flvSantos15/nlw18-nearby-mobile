import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native'
import { IconTicket } from '@tabler/icons-react-native'

import { s } from './styles'

import { colors } from '@/styles/theme'

export type TPlace = {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

type PlaceProps = TouchableOpacityProps & {
  data: TPlace
}

export function Place({ data, ...props }: PlaceProps) {
  return (
    <TouchableOpacity style={s.container} {...props}>
      <Image style={s.image} source={{ uri: data.cover }} />

      <View style={s.content}>
        <Text style={s.name}>{data?.name}</Text>

        <Text style={s.description}>{data?.description}</Text>

        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />

          <Text style={s.tickets}>{data?.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
