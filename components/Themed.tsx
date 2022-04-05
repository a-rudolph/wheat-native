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
  const grad_1 = useThemeColor({}, "grad_1");
  const grad_2 = useThemeColor({}, "grad_2");
  const grad_3 = useThemeColor({}, "grad_3");

  return (
    <LinearGradient
      style={[
        {
          borderRadius: 8,
          borderColor: "rgba(72, 79, 85, 0.2)",
          borderWidth: 1,
          padding: 16,
        },
        style,
      ]}
      locations={[0, 0.2, 0.8]}
      colors={[grad_1, grad_2, grad_3]}
      {...otherProps}
    >
      {children}
    </LinearGradient>
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
