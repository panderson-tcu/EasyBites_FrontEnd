import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#f2f1ed', 
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: '65%',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#9B8E73',
    marginBottom: 20,
  },
  inputField: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  sectionTitle: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  proteinContainer: {
    maxHeight: "60%",
    marginBottom: 10,
  },
  proteinButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedProteinButton: {
    backgroundColor: '#7B886B',
  },
  proteinButtonText: {
    color: '#000',
  },
  selectedProteinButtonText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#7B886B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
  },
  applyButtonText: {
    color: '#fff',
  },
  pickerContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pickerStyles: {
    color: '#000',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#9B8E73',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  resetButtonText: {
    color: '#000',
  },
});
export default styles;
