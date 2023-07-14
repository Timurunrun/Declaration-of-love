import React, {  useEffect, useRef, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Group, Panel, PanelHeader, Div, Button, FixedLayout, FormLayout } from '@vkontakte/vkui';

import sert from '../img/sertificate.jpg';

const Sertificate = ({id, firstPersonParent, secondPersonParent}) => {

	const [canvasContext, setCanvasContext] = useState(null);
	const canvasRef = useRef(null);
	var [firstPerson, setFirstPerson] = useState(firstPersonParent);
	var [secondPerson, setSecondPerson] = useState(secondPersonParent);
	
	useEffect(() => {
		
		const canvas = canvasRef.current;
		
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = sert;
	
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	
		const context = canvas.getContext('2d');
		setCanvasContext(context);
	
		context.fillStyle = 'white';
		
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = 'black';

		context.font = 'bold 20px Arial';
		context.textAlign = 'center';
		context.textBaseline = 'middle';

		context.fillText('Пожалуйста, подождите...', canvas.width / 2, canvas.height / 3 + 80);
	
		img.onload = () => {
		  	canvas.width = img.naturalWidth;
		  	canvas.height = img.naturalHeight;
			
		  	context.drawImage(img, 0, 0, canvas.width, canvas.height);

			context.font = 'bold 16px Arial';
			context.textAlign = 'center';
			context.textBaseline = 'middle';	  
						
			context.fillText(firstPerson, canvas.width / 2, canvas.height / 3 + 80);
			context.fillText(secondPerson, canvas.width / 2, canvas.height / 2 + 70);
		};
	}, [canvasRef, firstPerson, secondPerson]);
	
	const downloadCanvas = () => {
		const canvas = canvasRef.current;
		const downloadLink = document.createElement('a');
		downloadLink.href = canvas.toDataURL();
		downloadLink.download = 'sertificate.png';
		downloadLink.click();
	};
	
	return (
		<Panel id={id}>
			<PanelHeader>Сертификат</PanelHeader> {
				<Fragment>
					<Group>
						<FormLayout>
							<canvas ref={canvasRef}> </canvas>
						</FormLayout>
						<FixedLayout vertical='bottom'>
							<Div>
								<Button
									appearance='positive'
									stretched='true'
									size="l"
									onClick={downloadCanvas}>
									Скачать
								</Button>
							</Div>
						</FixedLayout>
					</Group>
				</Fragment>
			}
		</Panel>
	)
	
};

Sertificate.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Sertificate;