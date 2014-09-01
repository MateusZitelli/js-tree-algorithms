var Node = function(value){
  this.left = null;
  this.right = null;
  this.value = value;
  this.height = 1;
};

Node.prototype.rotateRR = function(){
  var oldValue = this.value;
  var oldLeft = this.left;
  this.value = this.right.value;
  this.left = this.right;
  this.right = this.right.right;
  this.left = this.right.left;
  this.left.value = oldValue;
  this.left.left = oldLeft;
  this.left.getHeightFromChildren();
  this.getHeightFromChildren();
  console.log('RR_BEFORE', this.height, oldLeft.height);
  console.log('RR_AFTER', this.height, oldLeft.height);
};

Node.prototype.rotateLL = function(){
  var oldRight = this.right;
  var oldValue = this.value;
  this.right = this.left;
  this.right.left = this.left.right;
  this.right.right = oldRight;
  this.left = this.left.left;
  console.log('LL_BEFORE',this.height, oldRight.height);
  console.log('LL_AFTER',this.height, oldRight.height);
};


Node.prototype.balance = function(){
  var leftNodeHeight = this.left === null ? 0 : this.left.height;
  var rightNodeHeight = this.right === null ? 0 : this.right.height;
  if(leftNodeHeight > rightNodeHeight + 1){
    var childLeftNodeHeight =
      this.left.left === null ? 0 : this.left.left.height;
    var childRightNodeHeight =
      this.left.right === null ? 0 : this.left.right.height;
    if(childRightNodeHeight > childLeftNodeHeight){
      this.left.rotateLL();
    }
    this.rotateRR();
  }else if(rightNodeHeight > leftNodeHeight + 1){
    var childLeftNodeHeight =
      this.right.left === null ? 0 : this.right.left.height;
    var childRightNodeHeight =
      this.right.right === null ? 0 : this.right.right.height;
    if(childRightNodeHeight < childLeftNodeHeight){
      this.right.rotateRR();
    }
    this.rotateLL();
  }
};

Node.prototype.getHeightFromChildren = function(){
  var rightHeight = this.right === null ? 0 : this.right.height;
  var leftHeight = this.left === null ? 0 : this.left.height;
  if(rightHeight >= leftHeight){
    this.height = rightHeight + 1;
  }else{
    this.height = leftHeight + 1;
  }
};

Node.prototype.insert = function(value){
  var added = false;
 if(value < this.value){
    if(this.left === null){
      this.left = new Node(value);
      added = true;
    }else{
      added = this.left.insert(value);
      if(added){
        this.balance();
      }
    }
  }else if(value > this.value){
    if(this.right === null){
      this.right = new Node(value);
      added = true;
    }else{
      added = this.right.insert(value);
      if(added){
        this.balance();
      }
    }
  }

  if(added){
    this.getHeightFromChildren();
  }

  return added;
};

Node.prototype.print = function(){
  if(this.right){
    this.right.print();
  }
  if(this.left){
    process.stdout.write('\n')
    this.left.print();
  }
}

var Tree = function(values){
  this.root = new Node(values[0]);
  for(var i = 1, len = values.length; i < len; i+=1){
    this.insert(values[i]);
  }
};

Tree.prototype.balanced = function(){
  return this.setBalance() < 2;
};

Tree.prototype.insert = function(value){
  this.root.insert(value);
};

Tree.prototype.print = function(){
  this.root.print();
}

var t = new Tree([1,2,3,4,7,6,7,8,9,10]);
