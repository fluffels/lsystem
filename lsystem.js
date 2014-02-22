/*
lsystem.js --- Basic L-System parser in JavaScript.

Copyright (C) 2014 Jan CW Kroeze 

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function LSystem()
{
   this.axiom = "";
   this.string = "";
   this.rules = [];
}

LSystem.prototype.setAxiom = function(axiom)
{
   this.axiom = axiom;
   this.string = axiom;
}

LSystem.prototype.addRule = function(rule)
{
   this.rules.push(rule);
}

LSystem.prototype.step = function()
{
   console.log("Starting run with string = '" + this.string + "'");

   var string = this.string;
   var newString = this.string;

   $.each(this.rules, function(idx, rule)
   {
      var pos = string.search(rule.predecessor);

      while (pos !== -1)
      {
         console.log("rule   : " + rule.predecessor + " => " + rule.successor);
         console.log("start  : '" + string + "'");

         var place_holder;
         if (rule.predecessor.length > rule.successor.length)
         {
            place_holder = spaces(rule.predecessor.length);
         }
         else
         {
            place_holder = spaces(rule.successor.length);
         }

         var successor;
         if (rule.predecessor.length > rule.successor.length)
         {
            successor = pad(rule.successor, rule.successor.length);
         }
         else
         {
            successor = rule.successor;
         }

         var match_length = rule.predecessor.length;

         string = string.slice(0, pos) + 
            place_holder + 
            string.slice(pos + match_length, string.length);

         newString = newString.slice(0, pos) +
            successor + 
            newString.slice(pos + match_length, string.length);

         console.log("temp   : '" + string + "'");
         console.log("result : '" + newString + "'");

         newString = newString.trim().replace(" ", "");
         pos = string.search(rule.predecessor);
      }
   });

   this.string = newString.trim().replace(" ", "");
}

function Rule(predecessor, successor)
{
   this.predecessor = predecessor;
   this.successor = successor;
}

function spaces(count)
{
   var r = "";
   for (var i = 0; i < count; i++)
   {
      r += " ";
   }
   return r;
}

function pad(str, count)
{
   var padding = count - str.length;
   var r = str;
   for (var i = 0; i < padding; i++)
   {
      r += " ";
   }
   return r;
}

