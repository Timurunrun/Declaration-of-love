import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Subscribe from './panels/Subscribe';
import Names from './panels/Names';
import Sertificate from './panels/Sertificate';

const App = () => {
	const [activePanel, setActivePanel] = useState('subscribe');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	var [firstPersonParent, setFirstPersonParent] = useState('');
	var [secondPersonParent, setSecondPersonParent] = useState('');

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const SubNow = async () => {
		await bridge.send('VKWebAppJoinGroup', {
			group_id: 129710506 //https://stage-app51682597-32c692379c9b.pages.vk-apps.com/index.html
			})
			.then((data) => { 
				if (data.result) {
					const event = { currentTarget: { dataset: { to: "names" } } };
					go(event);
				}
			})
			.catch((error) => {
				console.log(error);
			})
	};

	const SaveNames = (firstPerson, secondPerson) => {
		setFirstPersonParent(firstPerson);
		setSecondPersonParent(secondPerson);
		
		const event = { currentTarget: { dataset: { to: "sertificate" } } };
		go(event);
	}

	const GetNames = (person) => {
		if (person == 'firstPerson') {
			return firstPersonParent;
		}
		else if (person == 'secondPerson') {
			return secondPersonParent;
		}
		else {
			return 'error';
		}
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Subscribe id='subscribe' go={go} SubNow={SubNow}/>
								<Names id='names' go={go} SaveNames={SaveNames}/>
								<Sertificate id='sertificate' go={go} firstPersonParent={firstPersonParent} secondPersonParent={secondPersonParent}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;