import 'styled-components/native';
import { Theme } from './theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}

export type StyledProps<P = {}> = P & {
  theme: Theme;
}; 