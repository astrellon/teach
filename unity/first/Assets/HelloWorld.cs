using UnityEngine;

public class HelloWorld : MonoBehaviour
{
	// Use this for initialization
	void Start () 
    {
        int age = 24;
        Debug.Log(age);

        int newAge = AddOne(age);
        Debug.Log(age);
        Debug.Log(newAge);
	}
	
    int AddOne(int input)
    {
        return input + 1;
    }
}
