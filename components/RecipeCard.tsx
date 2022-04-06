import React from 'react'
import { View, Text, Card } from '../components/Themed'
import { StyleSheet } from 'react-native'
import { RecipeType } from '../constants/recipes'

type RecipeCardProps = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return <View style={styles.row} key={recipe.key}>
    <Card style={styles.col}>
      <Text color="wheaty" style={styles.title}>
        {recipe.name}
      </Text>
    </Card>
  </View>
}

const styles = StyleSheet.create({
  row: {
    padding: 8,
    flexDirection: "row",
    display: "flex",
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

