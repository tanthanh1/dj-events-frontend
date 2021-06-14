import { parseCookies } from '@/helpers/index'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
//import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'


export default function DashboardPage({events}) {
    console.log(events)
    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My events</h3>

            {events.map((evt)=>(
                    <h3>{evt.name}</h3>
            ))}


            </div>
        </Layout>
    )
}


export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)
  
    
    console.log(token)
    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const events = await res.json()

  
    return {
      props: {
        events
      },
    }
  }