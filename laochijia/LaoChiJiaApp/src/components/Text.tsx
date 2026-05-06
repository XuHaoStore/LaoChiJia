import React from 'react';
import {
  Text as RNText,
  TextProps,
  StyleSheet,
} from 'react-native';
import { Colors, FontSizes } from '../constants';

interface Props extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  color?: keyof typeof Colors.text | string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export default function Text({
  variant = 'body',
  color = 'primary',
  weight = 'regular',
  align = 'left',
  style,
  ...props
}: Props) {
  const textColor = Colors.text[color as keyof typeof Colors.text] || color;

  return (
    <RNText
      style={[
        styles.base,
        {
          color: textColor,
          textAlign: align,
        },
        variantStyles[variant],
        weightStyles[weight],
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
});

const variantStyles = StyleSheet.create({
  h1: {
    fontSize: FontSizes.xxxl,
    lineHeight: 40,
    fontWeight: '700',
  },
  h2: {
    fontSize: FontSizes.xxl,
    lineHeight: 32,
    fontWeight: '600',
  },
  h3: {
    fontSize: FontSizes.xl,
    lineHeight: 28,
    fontWeight: '600',
  },
  body: {
    fontSize: FontSizes.md,
    lineHeight: 24,
  },
  caption: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  small: {
    fontSize: FontSizes.xs,
    lineHeight: 16,
  },
});

const weightStyles = StyleSheet.create({
  regular: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});
