import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Group, Panel, PanelHeader, Div, Button, FormLayout, FormItem, Input, IconButton, FixedLayout } from '@vkontakte/vkui';
import { Icon16Clear } from '@vkontakte/icons';

const Names = ({id, SaveNames}) => {
	const [firstPerson, setFirstPerson] = useState('');
	const [secondPerson, setSecondPerson] = useState('');

	const firstInput = React.createRef();
	const secondInput = React.createRef();

  	const clearF = () => {
		firstInput.current.value = '';
		setFirstPerson('');
	}
	const clearS = () => {
		secondInput.current.value = '';
		setSecondPerson('');
	}

	return (
		<Panel id={id}>
			<PanelHeader>Регистрация</PanelHeader> {
				<Fragment>
		  			<Group>
						<FormLayout>
			  				<FormItem
								htmlFor="firstPerson"
        						top="Первое имя"
        						status={firstPerson ? (firstPerson.length < 50 ? 'valid' : 'error') : 'error'}
								bottom={firstPerson ? (firstPerson.length < 50 ? '' : 'Слишком длинный ввод. Попробуйте сократить ФИО') : 'Пожалуйста, введите ФИО'}
							>
								<Input
									id="firstPerson"
									getRef={firstInput}
									type="text"
									placeholder="Введите первое ФИО"
									value={firstPerson}
									onChange={e => setFirstPerson(e.target.value)}
									after={
										<IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={clearF}>
											<Icon16Clear />
										</IconButton>
									}
								/>
			  				</FormItem>
							<FormItem
								htmlFor="secondPerson"
        						top="Второе имя"
        						status={secondPerson ? (secondPerson.length < 50 ? 'valid' : 'error') : 'error'}
								bottom={secondPerson ? (secondPerson.length < 50 ? '' : 'Слишком длинный ввод. Попробуйте сократить ФИО') : 'Пожалуйста, введите ФИО'}
							>
								<Input
									id="secondPerson"
									getRef={secondInput}
									type="text"
									placeholder="Введите второе ФИО"
									value={secondPerson}
									onChange={e => setSecondPerson(e.target.value)}
									after={
										<IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={clearS}>
											<Icon16Clear />
										</IconButton>
									}
								/>
			  				</FormItem>
						</FormLayout>
						<FixedLayout vertical='bottom'>
							<Div>
								<Button
									appearance='positive'
									stretched='true'
									size="l"
									disabled={firstPerson && secondPerson ? false : true}
									onClick={() => SaveNames(firstPerson, secondPerson)}>
										Продолжить
								</Button>
							</Div>
						</FixedLayout>
		  			</Group>
				</Fragment>
			}
		</Panel>
	);
};

Names.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Names;