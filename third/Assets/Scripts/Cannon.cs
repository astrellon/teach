using UnityEngine;

public class Cannon : MonoBehaviour
{
    public GameObject CannonBallPrefab;

	// Use this for initialization
	void Start ()
    {
	
	}
	
	// Update is called once per frame
	void Update ()
    {
	    if (Input.GetKeyDown(KeyCode.Space))
        {
            var newCannonBall = Instantiate(CannonBallPrefab, Vector3.zero, Quaternion.identity);
        }
	}
}
