/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: keyof typeof Colors["dark"];
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, color = "text", ...otherProps } = props;
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );

  return <DefaultText style={[{ color: textColor }, style]} {...otherProps} />;
}

export function Card(props: ViewProps) {
  const { style, children, ...otherProps } = props;
  const scheme = useColorScheme();
  const from = useThemeColor({}, "primary_2");
  const to = useThemeColor({}, "primary");

  return (
    <DefaultView
      style={[
        {
          borderRadius: 8,
          borderColor: "rgba(72, 79, 85, 0.2)",
          borderWidth: 1,
        },
        style,
      ]}
      {...otherProps}
    >
      <LinearGradient
        style={{
          borderRadius: 8,
          padding: 16,
        }}
        locations={[0, 0.6]}
        colors={[from, to]}
      >
        {children}
      </LinearGradient>
    </DefaultView>
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
