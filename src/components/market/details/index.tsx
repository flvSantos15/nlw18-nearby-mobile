import { Text, View } from 'react-native'
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native'
import { s } from './styles'
import { Info } from '../info'

export type DetailsProps = {
  name: string
  description: string
  address: string
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
  console.log('details', data)
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>

        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>

        {data.rules.map((rule) => {
          return (
            <Text key={rule.id} style={s.rule}>
              {`\u2022 ${rule.description}`}
            </Text>
          )
        })}
      </View>
    </View>
  )
}
