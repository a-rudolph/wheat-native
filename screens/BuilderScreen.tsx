import { useMemo, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Card, Text, View } from "../components/Themed";
import { recipes } from "../constants/recipes";
import { RootTabScreenProps } from "../types";

enum Btf {
  OVERNIGHT = "overnight",
  SAMEDAYER = "samedayer",
}

const BuilderScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const [selectedBtf, setBtf] = useState<Btf>(Btf.SAMEDAYER);

  const options = [
    {
      title: "sameday",
      btf: Btf.SAMEDAYER,
      desc: "mix in the morning, bake in the evening",
    },
    {
      title: "overnight",
      btf: Btf.OVERNIGHT,
      desc: "mix in the afternoon, bake in the morning",
    },
  ];

  const filtered = useMemo(() => {
    return recipes.filter((option) => option.btf === selectedBtf);
  }, [selectedBtf]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.map(({ title, btf, desc }) => {
          const isSelected = btf === selectedBtf;
          const cardStyle = isSelected
            ? {
                borderColor: "#F6BB6366",
              }
            : {};

          return (
            <View key={btf} style={styles.col}>
              <Pressable style={styles.button} onPress={() => setBtf(btf)}>
                <Card style={[cardStyle, {}]}>
                  <Text style={styles.title}>{title}</Text>
                  <Text color="text_2">{desc}</Text>
                </Card>
              </Pressable>
            </View>
          );
        })}
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {filtered.map((recipe) => {
        return (
          <View style={styles.row} key={recipe.key}>
            <Card style={styles.col}>
              <Text color="wheaty" style={styles.title}>
                {recipe.name}
              </Text>
            </Card>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    padding: 8,
    flexDirection: "row",
    display: "flex",
  },
  col: { flex: 1, margin: 8 },
  button: {},
  title: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default BuilderScreen;
