import { View, Text, Card } from '../components/Themed'
import { View as DefaultView, StyleSheet } from 'react-native'
import { RecipeType } from '../constants/recipes'
import React from 'react'
import moment from 'moment'

type RecipeCardProps = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { start, bulk, proof } = recipe

  const mix = moment({
    hours: 0,
    minutes: 0,
    seconds: 0,
  }).add(start, 'hours')

  const shape = moment(mix).add(bulk, 'hours')
  const bake = moment(shape).add(proof, 'hours')

  const times = [mix, shape, bake]

  return <View style={[styles.row, { paddingHorizontal: 8 }]} key={recipe.key}>
    <Card style={styles.col}>
      <Text color="wheaty" style={styles.title}>
        {recipe.name}
      </Text>
      <DefaultView style={[styles.row, { marginLeft: -2 }]}>
        {times.map((time, i) => {
          return (
            <DefaultView key={i} style={[styles.row, { padding: 0 }]}>
              <View style={styles.timeWrap} color='primary_2'>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                  {time.format('h:mm a')}
                </Text>
              </View>
              {i < 2 && (
                <View color='primary_2' style={styles.line} />
              )}
            </DefaultView>
          )
        })}
      </DefaultView>
    </Card>
  </View>
}

const styles = StyleSheet.create({
  timeWrap: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 16,
    width: 88,
  },
  line: {
    width: 16,
    height: 1,
  },
  row: {
    paddingVertical: 8,
    flexDirection: "row",
    display: "flex",
    alignItems: 'center',
  },
  col: { flex: 1, margin: 8 },
  title: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
})

export default RecipeCard

