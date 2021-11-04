import { ReactChildren, ReactChild } from 'react';
import { Thanks } from '../../components/Thanks';

import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

export default function Router({ children }: AuxProps) {
  let location = useLocation();
  return (
    <Switch location={location}>
      <Route path="/about">
        <Thanks />
      </Route>
      <Route path="/">
        {children}
      </Route>
    </Switch>
  );
}