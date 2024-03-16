import { FC, useState } from 'react';
import {
  Panel,
  PanelHeader,
  NavIdProps,
  TabsItem,
  Tabs,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

import styles from './styles.module.css';
import { FactContent } from '../../components/FactContent';
import { AgeContent } from '../../components/AgeContent';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

type PanelType = 'fact' | 'age';

export const Home: FC<HomeProps> = ({ id }) => {
  // const { photo_200, city, first_name, last_name } = { ...fetchedUser };
//   const routeNavigator = useRouteNavigator();

  const [visiblePanel, setVisiblePanel] = useState<PanelType>('fact');

  const handleFactClick = () => {
    setVisiblePanel('fact');
  }

  const handleAgeClick = () => {
    setVisiblePanel('age');
  }

  return (
    <Panel id={id}>
      <PanelHeader>
        <Tabs className={styles.tabs}>
            <TabsItem
                selected={visiblePanel === 'fact'}
                onClick={handleFactClick}
                id="tab-fact"
                aria-controls="tab-content-fact"
                className={styles.tab}
            >
                Факт про котиков
            </TabsItem>
            <TabsItem
                selected={visiblePanel === 'age'}
                onClick={handleAgeClick}
                id="tab-age"
                aria-controls="tab-content-age"
                className={styles.tab}
            >
                Ваш возраст
            </TabsItem>
        </Tabs>
      </PanelHeader>

      {visiblePanel === 'fact' && <FactContent id='tab-content-fact' ariaLabelledby='tab-fact'/>}
      {visiblePanel === 'age' && <AgeContent id='tab-content-age' ariaLabelledby='tab-age'/>}
      
      {/* {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group> */}

    </Panel>
  );
};
