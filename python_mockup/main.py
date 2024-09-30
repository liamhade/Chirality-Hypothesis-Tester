class Node:
	def __init__(self, name_: str, type: str, stereochemistry: list[int]):
		self.name_ = name_
		self.type   = type
		self.child  = None
		self.stereochemistry = stereochemistry

	def set_child(self, child_node):
		self.child = child_node

def graph(nodes):
	pass

def simulate(nodes):
	pass

def nodes_from_txt(file_path):
	pass

if __name__ == "__main__":
	pass