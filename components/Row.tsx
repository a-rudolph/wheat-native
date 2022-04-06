import { View, ViewProps } from "./Themed";
import _isNumber from "lodash/isNumber";

type RowProps = {
  dir?: "h" | "v";
} & ViewProps;

type ColProps = {
  span?: number;
} & ViewProps;

const Row = ({ dir = "h", style, ...viewProps }: RowProps) => {
  return (
    <View
      style={[
        {
          flexDirection: dir === "h" ? "row" : "column",
          height: 100,
          width: 20
        },
        style,
      ]}
    >
      <View
        style={[
          {
            flex: 1,
          },
        ]}
        {...viewProps}
      />
    </View>
  );
};

const Col = ({ span, ...viewProps }: ColProps) => {
  const width = _isNumber(span) ? `${(span * 100) / 24}%` : span;

  return <View style={{ width }} {...viewProps} />;
};

Row.Col = Col;

export default Row;

