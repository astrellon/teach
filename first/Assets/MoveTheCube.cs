using UnityEngine;
using System.Collections;

public class MoveTheCube : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        // Add code here
		// So here we're moving the cube to the right every frame, however we don't want to do that
		// independantly of the framerate otherwise it'll move really fast. So we multiply the time difference
		// between each frame then after 1 second the cube will have moved by 1 unit.
        //transform.position += Vector3.right * Time.deltaTime;

		if (Input.GetKey(KeyCode.A))
		{
			transform.position -= Vector3.right * Time.deltaTime;
		}
		else if (Input.GetKey(KeyCode.D))
		{
			transform.position += Vector3.right * Time.deltaTime;
		}

	}
}
