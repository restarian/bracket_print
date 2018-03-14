## How styles are chosen
---
### Document pages

---

### Style map
Styles are allied to Bracket print via object data stored in the module prototype. This object can be accessed in the *lib -> style_map.js* script or at run time through by altering the *.style_map* object data. The style map is an object which contains objects that specify platforms. The platforms specify more objects which are used as themes. The themes specify levels which correlate to the current *level* set as option data. Therefore, all of the theme qualifiers end with an underscore and a integer. This integer then matches with the current set *level* to deduce which style to use.


### The *level* option is multi-faceted 
The style to apply (and whether or not Bracket print will do anything at all), is dependent on what *level* is set to a particular instance. The style map contains themes which are contained in platforms. Bracket Print includes two unique level styles in both light and dark themes. The style for *level 1* is generally expected to be used for normal (generic), logging. The *level 2* style is expected (but not mandated), to be used for error logs. A new style must be set to the style map for levels other than 1 or 2 to be used. 

Below is some pictorial screenshots of the *level* option being used with the *theme* option in both Windows and Ubuntu. This output can be reproduced in the *example -> themes_and_styles.js* example script. 

| In Windows shell | In the Ubuntu terminal |
|:-------------:|:---------------:|
| ![Windows Shell Pic] | ![Ubuntu Terminal Pic] |

[Ubuntu Terminal Pic]: https://github.com/restarian/bracket_print/blob/master/example/image/ubuntu_terminal.jpg
[Windows Shell Pic]: https://github.com/restarian/bracket_print/blob/master/example/image/windows_shell.jpg
