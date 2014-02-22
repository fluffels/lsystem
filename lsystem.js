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

