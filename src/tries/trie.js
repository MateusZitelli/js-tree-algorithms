/*
 * Trie is an ordered tree data structure used
 * to store mainly strings. It consists in a
 * tree where each node can have a value and its
 * links a single character. A trie is aways
 * travesed from the root to its children nodes.
 * A node with a non-null value means that the
 * word represented by the characters from the
 * root to this node contained in the trie, and
 * the value of this node is aways exactly the
 * word mentioned.
*/

var Trie = function(){
  this.value = null;
  this.children = {};
};

/**
 * Inserts a string into the trie structure.
 * @param  {string} data
 */
Trie.prototype.insert = function(data){
  var wordIndex, word, charIndex, wordLen, node;

  if(data === null){
    return;
  }else if(toString.call(data) === '[object String]'){
    //If is a string split is in single words
    data = data.split(' ');
  }else if(toString.call(data) !== '[object Array]'){
    throw('The input must be null, a string or an array');
  }

  for(wordIndex in data){
    // For each word inserted
    word = data[wordIndex];
    node = this;

    for(charIndex = 0, wordLen = word.length; charIndex < wordLen;
        charIndex++){
      var character = word.slice(charIndex, charIndex + 1);
      var remainingString = word.slice(charIndex + 1);

      if(!node.children[character]){
        node.children[character] = new Trie(remainingString);
      }
      node = node.children[character];
    }

    node.value = word;
  }
};

/**
 * Searches for a given string in the trie.
 * @param  {string} word
 * @return {Node}      The final node that
 * contains the string
 */
Trie.prototype.search = function(word){
  var node = this;
  var charIndex = 0;
  var charOnIndex;

  while(node && charIndex < word.length){
    charOnIndex = word.slice(charIndex, charIndex+1);
    charIndex += 1;
    node = node.children[charOnIndex];
  }

  if(node && node.value === word){
    return node;
  }else{
    return null;
  }
};


/**
 * Deletes a string from the trie without
 * deleting nodes that define other words
 * @param  {string} data
 */
Trie.prototype.delete = function(data){
  var word, wordIndex, charIndex, node, childrentack, stackLen, index,
    charToRemove;
  if(data === null){
    return;
  }else if(toString.call(data) === '[object String]'){
    data = data.split(' ');
  }else if(toString.call(data) !== '[object Array]'){
    throw('The input must be null, a string or an array');
  }

  for(wordIndex in data){
    charIndex = 0;
    word = data[wordIndex];
    childrentack = [];
    node = this;
    while(node && charIndex < word.length){
      // Store the nodes and the children that store the word
      charOnIndex = word.slice(charIndex, charIndex + 1);
      charIndex += 1;
      childrentack.push({charToRemove: charOnIndex, node: node});
      node = node.children[charOnIndex];
    }

    if(node && node.value === word){
      // If the word is defined in the trie, climb it removing the nodes
      // util find a node that is used by other word.
      stackLen = childrentack.length;
      for(index = stackLen - 1; index >= 0; index--){
        node = childrentack[index].node;
        charToRemove = childrentack[index].charToRemove;
        if(Object.keys(node.children[charToRemove].children).length >= 1){
          break;
        }
        delete node.children[charToRemove];
      }
    }
  }
};

module.exports = {
  Trie: Trie
};
