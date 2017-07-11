/**
Descriptions of the colors used in displaying each sort
**/

import React from 'react';			//so we can use jsx

import COLORS from './colors';

const COLOR_KEY = {
	'Bubble Sort':  <h4 className='pull-right' id='color-key'>
									  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
									  <span style={{color:COLORS.red}}>active</span>

									  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

									  <span style={{color:COLORS.green}}>sorted</span>

									  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

									  <span style={{color:COLORS.white}}>unsorted</span>
									</h4>,

	
	'Cocktail Shaker Sort': <h4 className='pull-right' id='color-key'>
													  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
													  <span style={{color:COLORS.red}}>active</span>

													  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

													  <span style={{color:COLORS.green}}>sorted</span>

													  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

													  <span style={{color:COLORS.white}}>unsorted</span>
													</h4>,


	'Gnome Sort': <h4 className='pull-right' id='color-key'>
								  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
								  <span style={{color:COLORS.red}}>active</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.green}}>partially sorted</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.white}}>unsorted</span>
								</h4>,


	'Heapsort': <h4 className='pull-right' id='color-key'>
							  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
							  <span style={{color:COLORS.red}}>active</span>

							  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

							  <span style={{color:COLORS.green}}>sorted</span>

							  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

							  <span style={{color:COLORS.cyan}}>valid heap space</span>

							  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

							  <span style={{color:COLORS.yellow}}>invalid heap space</span>
							</h4>,

	'Insertion Sort': <h4 className='pull-right' id='color-key'>
										  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
										  <span style={{color:COLORS.red}}>active</span>

										  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

										  <span style={{color:COLORS.green}}>partially sorted</span>

										  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

										  <span style={{color:COLORS.white}}>unsorted</span>
										</h4>,

	'Introsort':  <h4 className='pull-right text-right' id='color-key-introsort'>
								  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
								  <span style={{color:COLORS.red}}>active</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'18px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.yellow}}>&gt; pivot / invalid heap space</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'18px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.cyan}}>&lt;= pivot / valid heap space</span>
								  <br/>
								  <span style={{color:COLORS.purple}}>pivot</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'18px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.green}}>partially sorted</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'18px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.lightGreen}}>in current section but not yet partitioned</span>
								</h4>,

	'Merge Sort': <h4 className='pull-right' id='color-key'>
								  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
								  <span style={{color:COLORS.red}}>active</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.green}}>partially sorted</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.cyan}}>left section</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.yellow}}>right section</span>
								</h4>,
	
	'Quicksort':  <h4 className='pull-right' id='color-key'>
								  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
								  <span style={{color:COLORS.red}}>active</span>
								  
								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;
								  
								  <span style={{color:COLORS.green}}>partially sorted</span>
								  
								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;
								  
								  <span style={{color:COLORS.purple}}>pivot</span>
								  
								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;
								  
								  <span style={{color:COLORS.cyan}}>&lt;= pivot</span>
								  
								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;
								  
								  <span style={{color:COLORS.yellow}}>&gt; pivot</span>
								  
								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;
								  
								  <span style={{color:COLORS.lightGreen}}>not yet partitioned</span>
								</h4>,
	
	
	'Selection Sort': <h4 className='pull-right' id='color-key'>
										  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
										  <span style={{color:COLORS.red}}>active</span>

										  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

										  <span style={{color:COLORS.green}}>sorted</span>

										  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

										  <span style={{color:COLORS.orange}}>current min</span>

										  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

										  <span style={{color:COLORS.white}}>unsorted</span>
										</h4>,
	
	
	'Shellsort':  <h4 className='pull-right' id='color-key'>
								  <span style={{color:COLORS.white}}>Color key:&nbsp;&nbsp;</span>
								  <span style={{color:COLORS.red}}>active</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.blue}}>current run</span>
								  
								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.lighterBlue}}>run before current</span>

								  &nbsp;&nbsp;<span style={{'fontSize':'22px',color:COLORS.white}}>|</span>&nbsp;&nbsp;

								  <span style={{color:COLORS.lightestBlue}}>run before that etc...</span>
								</h4>,
};

export default COLOR_KEY;