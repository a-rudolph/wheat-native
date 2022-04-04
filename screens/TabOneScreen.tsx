import { loadOptions } from "@babel/core";
import { useMemo } from "react";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Card, Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../types";

enum Btr {
  OVERNIGHT = "overnight",
  SAMEDAYER = "samedayer",
}

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [selectedBtr, setBtr] = useState<Btr>(Btr.SAMEDAYER);

  const options = [
    {
      title: "sameday",
      btr: Btr.SAMEDAYER,
      desc: "mix in the morning, bake in the evening",
    },
    {
      title: "overnight",
      btr: Btr.OVERNIGHT,
      desc: "mix in the afternoon, bake in the morning",
    },
  ];

  const desc = useMemo(() => {
    return options.find((option) => option.btr === selectedBtr)?.desc;
  }, [selectedBtr]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.map(({ title, btr }) => {
          const isSelected = btr === selectedBtr;
          const cardStyle = isSelected
            ? {
                borderColor: "#F6BB6366",
              }
            : {};

          /**
           * border: 1px solid #F6BB6366
           */
          return (
            <Pressable
              key={btr}
              style={styles.button}
              onPress={() => setBtr(btr)}
            >
              <Card style={cardStyle}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {title}
                </Text>
              </Card>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.row}>
        {desc && (
          <Text
            style={{ textAlign: "left", flex: 1, marginLeft: 16 }}
            color="text_2"
          >
            {desc}
          </Text>
        )}
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
  },
  row: {
    padding: 8,
    flexDirection: "row",
    display: "flex",
  },
  button: { flex: 1, margin: 8 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
