# Visual Sorter
A web app that helps users learn about common sorting algorithms by visualizing their output step by step.

## Usage
Upon visiting the page a user will find a randomized set of data which is displayed with a canvas element. Each piece of data is color coded and the user is presented with a color key informing them of the algorithm specific role of each color. Controls allow the user to change algorithms, start/pause sorting, step the sorting forward by one step, as well as alter the speed of sorting and the number of items being sorted. A brief description of each algorithm is also provided.

## Implementation

Stack: React, Bootstrap, Express, Node.js

The front-end is implemented with React and styling is done using Boostrap (v3). The actual data being sorted is displayed with a canvas element.

Each algorithm is implemented as a class with a generator method tick. Calling the iterator returned by tick will progress the algorithm forward by one step, modifying the data being sorted and creating a color map for adding color to the updated data.


## Installation

To get the app up and running, perform the following commands.
```
$ git clone https://github.com/nicholas-zeiss/sort-colors.git
$ cd sort-colors/
$ npm i
$ npm start
```
The app will now be running on your localhost at port 5050.

