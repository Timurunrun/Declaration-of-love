import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Group, Panel, PanelHeader, Div, Button, FixedLayout } from '@vkontakte/vkui';

import './Subscribe.css'

const Subscribe = ({id, SubNow}) => {
	return (
		<Panel id={id} centered={true}>
			<PanelHeader>Подписка</PanelHeader> {
				<Fragment>
					<Group>
						<Div className='Subscribe'>
							<h2>Для продолжения использования, пожалуйста, подпишитесь на предложенную группу</h2>
						</Div>
					</Group>
					<FixedLayout vertical='bottom'>
						<Div>
							<Button appearance='positive' stretched='true' size="l" onClick={SubNow}>
								Хорошо
							</Button>
						</Div>
					</FixedLayout>
				</Fragment>
			}
		</Panel>
	)
};

Subscribe.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Subscribe;