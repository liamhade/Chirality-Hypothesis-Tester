import pandas as pd
import pydot

class Node:
	def __init__(self, name: str, type: str, child: str, stereochemistry: list[int], transformation: list[int]):
		self.name = name
		self.type   = type

		if child == 'nan':
			self.child  = None
		else:
			self.child  = child


		self.stereochemistry = stereochemistry
		self.transformation  = transformation

	def __str__(self):
		string = f'{self.name} ({self.type}):\n'
		if self.type == 'compound': 
			string += f'\tstereochemistry: {self.stereochemistry}\n'
		elif self.type == 'reaction':
			string += f'\ttransformation: {self.transformation}\n'
		string += f'\tchild: {self.child}'
		
		return string

	def set_child(self, child_node):
		self.child = child_node

def nodes_from_txt(file_path):
	chemistry_table = pd.read_csv(chemistry_file, sep='\t')
	nodes = []

	for i, row in chemistry_table.iterrows():
		name  = row['Name']
		type  = row['Type']
		child = str(row['Child'])
		stereochemistry = None

		if type == 'compound':
			stereochemistry = eval(row['Stereochemistry (compounds only)'])
			transformation = None
		elif type == 'reaction':
			transformation = eval(row['Transformation (reactions only)'])
			stereochemistry = None
		
		node = Node(name=name, type=type, stereochemistry=stereochemistry, transformation=transformation, child=child)
		nodes.append(node)

	return nodes

def order_nodes(nodes):
	ordered_nodes = [nodes[0]]

	while len(ordered_nodes) != len(nodes):
		for node in nodes:
			first_node = ordered_nodes[0]
			last_node  = ordered_nodes[-1]

			if node not in ordered_nodes:
				# insert at the front
				if first_node.name == node.child:
					ordered_nodes.insert(0, node)

				# append to the end
				elif last_node.child == node.name:
					ordered_nodes.append(node)

	return ordered_nodes

def graph(ordered_nodes, node_2_highlight:str=None, output_path='graph.png'):
	node_graph = pydot.Dot(graph_type='digraph')

	for i, node in enumerate(ordered_nodes):
		# Add nodes (compounds)
		if node.type == 'compound':
			pydot_node = pydot.Node(node.name, color=('red' if node_2_highlight == node.name else 'black'), label=node.name)
			node_graph.add_node(pydot_node)

		# Add edge (reactions)
		elif node.type == 'reaction':
			pydot_edge = pydot.Edge(ordered_nodes[i-1].name, node.child, color=('red' if node_2_highlight == node.name else 'black'), label=node.name)
			node_graph.add_edge(pydot_edge)

	node_graph.write_png(output_path)

def simulate(ordered_nodes):
	multiply_lists = lambda l1, l2: [l1[i] * l2[i] for i in range(len(l1))]
	root_node = ordered_nodes[0]

	if root_node.type != 'compound':
		raise 'Error: First node must be a compound!'
	else:
		stereochem = root_node.stereochemistry

		for node in ordered_nodes:
			if node.type == 'reaction':
				stereochem = multiply_lists(stereochem, node.transformation)

			else:
				if stereochem != node.stereochemistry:
					print('Chirality of reaction is not possible!')
					print(f'\t {node.name} stereochemistry of {node.stereochemistry} does not match prediction of {stereochem}')
					return node.name
				else:
					continue

	print('Chirality of reaction is possible!')
	return None


if __name__ == "__main__":
	chemistry_file = r'C:\Users\Liam Hade\Desktop\chirality-hypothesis-tester\python_mockup\chemistry.txt'
	unordered_nodes = nodes_from_txt(chemistry_file)
	ordered_nodes 	= order_nodes(unordered_nodes)
	highlighted_node = simulate(ordered_nodes)
	graph(ordered_nodes, node_2_highlight=highlighted_node)


		
		
