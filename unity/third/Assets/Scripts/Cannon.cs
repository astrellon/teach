using UnityEngine;

public class Cannon : MonoBehaviour
{
    public GameObject CannonBallPrefab;
    public GameObject Barrel;
    public float Force = 1000.0f;

	// Update is called once per frame
	void Update ()
    {
	    if (Input.GetKeyDown(KeyCode.Space))
        {
            var endOfBarrel = Barrel.transform.position + Barrel.transform.up;
            var newCannonBall = Instantiate(CannonBallPrefab, endOfBarrel, Quaternion.identity) as GameObject;
            newCannonBall.GetComponent<Rigidbody>().AddForce(Barrel.transform.up * Force);
        }
	}
}
